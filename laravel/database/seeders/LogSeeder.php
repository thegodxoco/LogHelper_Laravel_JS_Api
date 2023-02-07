<?php

namespace Database\Seeders;

use App\Models\Log;
use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($j = 1; $j <= 20; $j++) {
            $random = rand(0, 50);
            if ($random != 0) {
                Log::factory($random)->create([
                    'server_id' => $j,
                ]);
            }
        }
    }
}
