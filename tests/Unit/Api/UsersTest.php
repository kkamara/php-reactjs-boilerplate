<?php

namespace Tests\Unit\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UsersTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $headers = ['Content-Type' => 'application/json'];

    public function testRegisterUser()
    {
        $email = $this->faker->unique()->safeEmail;
        $response = $this->withHeaders($this->headers)
            ->postJson(
                '/api/user/register', 
                [
                    'first_name' => $this->faker->unique()->firstName,
                    'last_name' => $this->faker->unique()->lastName,
                    'email' => $email,
                    'password' => 'secret',
                    'password_confirmation' => 'secret',
                ],
            );

        $response->assertStatus(201)->assertJsonStructure([
            'data' => ['first_name', 'last_name', 'email', 'created_at', 'updated_at', 'token',],
        ]);
    }

    public function testRegisterUserInvalidData()
    {
        $response = $this->withHeaders($this->headers)
            ->postJson('/api/user/register');

        $response->assertStatus(400)->assertJsonStructure([
            'first_name', 'last_name', 'email', 'password',
        ]);
    }

    public function testRegisterUserEmailAlreadyExists()
    {
        $email = $this->faker->unique()->safeEmail;
        User::factory()->create(['email' => $email,]);
        $response = $this->withHeaders($this->headers)
            ->postJson(
                '/api/user/register', 
                [
                    'first_name' => $this->faker->unique()->firstName,
                    'last_name' => $this->faker->unique()->lastName,
                    'email' => $email,
                    'password' => 'secret',
                    'password_confirmation' => 'secret',
                ],
            );

        $response->assertStatus(400)->assertJsonStructure([ 'email', ]);
    }

    public function testLoginUser()
    {
        $email = $this->faker->unique()->safeEmail;
        $user = User::factory()->create(['email' => $email,]);
        $response = $this->withHeaders($this->headers)
            ->postJson(
                '/api/user/', 
                ['email' => $user->email, 'password' => 'secret',],
            );

        $response->assertStatus(200)->assertJsonStructure([
            'data' => ['first_name', 'last_name', 'email', 'created_at', 'updated_at', 'token',],
        ]);
    }

    public function testLoginUserInvalidData()
    {
        $email = $this->faker->unique()->safeEmail;
        User::factory()->create(['email' => $email,]);
        $response = $this->withHeaders($this->headers)
            ->postJson('/api/user/');

        $response->assertStatus(400)->assertJsonStructure([ 'email', 'password', ]);
    }

    public function testLoginUserInvalidCombination()
    {
        $user = User::factory()->create(['email' => $this->faker->unique()->safeEmail,]);
        $response = $this->withHeaders($this->headers)
            ->postJson(
                '/api/user/', 
                ['email' => $user->email, 'password' => 'invalid_password',],
            );

        $response->assertStatus(400)->assertJsonStructure([ 'error', ]);
    }

    public function testAuthorizeUser()
    {
        $email = $this->faker->unique()->safeEmail;
        $user = User::factory()->create(['email' => $email,]);
        $loginResponse = $this->withHeaders($this->headers)
            ->postJson(
                '/api/user/', 
                ['email' => $user->email, 'password' => 'secret',],
            );
        
        $authResponse = $this->withHeaders(array_merge(
            $this->headers, 
            ['Authorization' => 'Bearer '.$loginResponse->json()['data']['token']],
        ))->getJson('/api/user/authorize');

        $authResponse->assertStatus(200)->assertJsonStructure([
            'data' => ['first_name', 'last_name', 'email', 'created_at', 'updated_at', 'token',],
        ]);
    }

    public function testAuthorizeUserAuthenticationError()
    {        
        $response = $this->withHeaders(array_merge(
            $this->headers, 
            ['Authorization' => 'Bearer 1'],
        ))->getJson('/api/user/authorize');

        $response->assertStatus(401)->assertJson(['message' => 'Unauthenticated.'], true);
    }
}
