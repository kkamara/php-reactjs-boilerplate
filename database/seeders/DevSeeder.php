<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class DevSeeder extends Seeder
{
    /**
     * @param int $count {1000}
     * @return Product|Product[]
     */
    private function makeProducts(int $count=50) {
        return Product::factory()
            ->count($count)
            ->create();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->makeProducts();
    }
}
