<?php

namespace Database\Seeders;

use App\Models\Log;
use App\Models\Server;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ServerSeeder::class,
            LogSeeder::class,
        ]);
    }
}