<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class LogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'timestamp' => $this->faker->dateTime($max = 'now', $timezone = null),
            'description' => $this->faker->text(25),
        ];
    }
}
