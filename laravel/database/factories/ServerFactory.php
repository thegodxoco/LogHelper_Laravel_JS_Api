<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ServerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $random = rand(1, 100);
        if ($random <= 70) {
            return [
                'ipv4' => $this->faker->unique()->ipv4(),
                'location' => $this->faker->city(),
                'description' => $this->faker->text(25),
            ];
        }
        if ($random > 70 && $random <= 85) {
            return [
                'ipv6' => $this->faker->unique()->ipv6(),
                'location' => $this->faker->city(),
                'description' => $this->faker->text(25),
            ];
        }
        if ($random > 85) {
            return [
                'ipv4' => $this->faker->unique()->ipv4(),
                'ipv6' => $this->faker->unique()->ipv6(),
                'location' => $this->faker->city(),
                'description' => $this->faker->text(25),
            ];
        }
    }
}
