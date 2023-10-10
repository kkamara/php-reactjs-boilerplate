<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $email = 'admin@example.com';
        if (
            null !== User::where(
                'email', $email
            )->first()
        ) {
            return;
        }
        User::factory()->count(1)
            ->create(compact('email'));
    }
}
