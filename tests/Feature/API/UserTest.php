<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
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
                    'name' => $this->faker->unique()->name,
                    'email' => $email,
                    'password' => 'secret',
                    'password_confirmation' => 'secret',
                ],
            );

        $response->assertStatus(Response::HTTP_CREATED)->assertJsonStructure([
            'data' => ['name', 'email', 'createdAt', 'updatedAt', 'token',],
        ]);
    }

    public function testRegisterUserInvalidData()
    {
        $response = $this->withHeaders($this->headers)
            ->postJson('/api/user/register');

        $response->assertStatus(Response::HTTP_BAD_REQUEST)->assertJsonStructure([
            'name', 'email', 'password',
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
                    'name' => $this->faker->unique()->name,
                    'email' => $email,
                    'password' => 'secret',
                    'password_confirmation' => 'secret',
                ],
            );

        $response->assertStatus(Response::HTTP_BAD_REQUEST)->assertJsonStructure([ 'email', ]);
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

        $response->assertStatus(Response::HTTP_OK)->assertJsonStructure([
            'data' => ['name', 'email', 'createdAt', 'updatedAt', 'token',],
        ]);
    }

    public function testLoginUserInvalidData()
    {
        $email = $this->faker->unique()->safeEmail;
        User::factory()->create(['email' => $email,]);
        $response = $this->withHeaders($this->headers)
            ->postJson('/api/user/');

        $response->assertStatus(Response::HTTP_BAD_REQUEST)->assertJsonStructure([ 'email', 'password', ]);
    }

    public function testLoginUserInvalidCombination()
    {
        $user = User::factory()->create(['email' => $this->faker->unique()->safeEmail,]);
        $response = $this->withHeaders($this->headers)
            ->postJson(
                '/api/user/', 
                ['email' => $user->email, 'password' => 'invalid_password',],
            );

        $response->assertStatus(Response::HTTP_BAD_REQUEST)->assertJsonStructure([ 'error', ]);
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

        $authResponse->assertStatus(Response::HTTP_OK)->assertJsonStructure([
            'data' => ['name', 'email', 'createdAt', 'updatedAt',],
        ]);
    }

    public function testAuthorizeUserAuthenticationError()
    {        
        $response = $this->withHeaders(array_merge(
            $this->headers, 
            ['Authorization' => 'Bearer 1'],
        ))->getJson('/api/user/authorize');

        $response->assertStatus(Response::HTTP_UNAUTHORIZED)->assertJson(['message' => 'Unauthenticated.'], true);
    }
}
