<?php

namespace Database\Seeders\V1;

use App\Models\V1\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder as IlluminateSeeder;

class Seeder extends IlluminateSeeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->count(30)->create();
        User::factory()->create([
            "first_name" => "Jane",
            "last_name" => "Doe",
            "email" => "jane@doe.com",
        ]);
    }
}
