<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class user_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->users();
    }

    public function users()
    {
        $faker = Faker::create();
        foreach (range(0, 20) as $i) {
            $firstame = $faker->firstName;
            $lastame = $faker->lastname;
            $name = $firstame . " " . $lastame;

            DB::table('users')->insert([
                'name' => $name,
                'firstname' => $firstame,
                'lastname' => $lastame,
                'birthdate' => $faker->date,
                'email' => $faker->email,
                'gender' => 'L',
                'mobile_number' => $faker->phoneNumber,
            ]);
        }
    }
}
