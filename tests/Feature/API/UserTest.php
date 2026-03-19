<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $headers = ["Content-Type" => "application/json"];

    public function testRegisterUser(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $response = $this->withHeaders($this->headers)
            ->postJson(
                "/api/v1/user/register", 
                [
                    "firstName" => $this->faker->unique()->firstName,
                    "lastName" => $this->faker->unique()->lastName,
                    "email" => $email,
                    "password" => "secret",
                    "passwordConfirmation" => "secret",
                ],
            );
        $response->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                "data" => [
                    "firstName",
                    "lastName",
                    "email",
                    "createdAt",
                    "updatedAt",
                    "token",
                ],
            ]);
    }

    public function testRegisterUserInvalidData(): void
    {
        $response = $this->withHeaders($this->headers)
            ->postJson("/api/v1/user/register");

        $response->assertStatus(Response::HTTP_BAD_REQUEST)
            ->assertJsonStructure([
                "firstName", "lastName", "email", "password",
            ]);
    }

    public function testRegisterUserEmailAlreadyExists(): void
    {
        $email = $this->faker->unique()->safeEmail;
        User::factory()->create(["email" => $email]);
        $response = $this->withHeaders($this->headers)
            ->postJson(
                "/api/v1/user/register", 
                [
                    "firstName" => $this->faker->unique()->firstName,
                    "lastName" => $this->faker->unique()->lastName,
                    "email" => $email,
                    "password" => "secret",
                    "passwordConfirmation" => "secret",
                ],
            );

        $response->assertStatus(Response::HTTP_BAD_REQUEST)
            ->assertJsonStructure(["email"]);
    }

    public function testLoginUser(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $user = User::factory()->create(["email" => $email]);
        $response = $this->withHeaders($this->headers)
            ->postJson(
                "/api/v1/user", 
                ["email" => $user->email, "password" => "secret"],
            );

        $response->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                "data" => [
                    "firstName",
                    "lastName",
                    "email",
                    "createdAt",
                    "updatedAt",
                    "token",
                ],
            ]);
    }

    public function testLoginUserInvalidData(): void
    {
        $email = $this->faker->unique()->safeEmail;
        User::factory()->create(["email" => $email]);
        $response = $this->withHeaders($this->headers)
            ->postJson("/api/v1/user");

        $response->assertStatus(Response::HTTP_BAD_REQUEST)
            ->assertJsonStructure(["email", "password"]);
    }

    public function testLoginUserInvalidCombination(): void
    {
        $user = User::factory()->create([
            "email" => $this->faker->unique()->safeEmail,
        ]);
        $response = $this->withHeaders($this->headers)
            ->postJson(
                "/api/v1/user", 
                ["email" => $user->email, "password" => "invalid_password"],
            );

        $response->assertStatus(Response::HTTP_BAD_REQUEST)
            ->assertJsonStructure(["error"]);
    }

    public function testAuthoriseUser(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $user = User::factory()->create(["email" => $email]);

        Sanctum::actingAs($user);
        
        $authResponse = $this->withHeaders($this->headers)
            ->getJson("/api/v1/user/authorise");

        $authResponse->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure([
                "data" => [
                    "firstName",
                    "lastName",
                    "email",
                    "createdAt",
                    "updatedAt",
                ],
            ]);
    }

    public function testAuthoriseUserAuthenticationError(): void
    {        
        $response = $this->withHeaders($this->headers)
            ->getJson("/api/v1/user/authorise");

        $response->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson(
                ["message" => "Unauthenticated."],
                true,
            );
    }

    public function testLogoutUser(): void
    {
        $email = $this->faker->unique()->safeEmail;
        $user = User::factory()->create(["email" => $email]);

        Sanctum::actingAs($user);
        
        $authResponse = $this->withHeaders($this->headers)
            ->deleteJson("/api/v1/user/logout");

        $authResponse->assertStatus(Response::HTTP_OK)
            ->assertJson(
                ["message" => "Success"],
                true,
            );
    }

    public function testLogoutUserAuthenticationError(): void
    {        
        $response = $this->withHeaders($this->headers)
            ->deleteJson("/api/v1/user/logout");

        $response->assertStatus(Response::HTTP_UNAUTHORIZED)
            ->assertJson(
                ["message" => "Unauthenticated."],
                true,
            );
    }
}
