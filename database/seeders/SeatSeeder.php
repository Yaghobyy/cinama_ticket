<?php

namespace Database\Seeders;

use App\Models\Seat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Seat::query()->delete();

        foreach(range('A','J') as $row){
            for($number=1;$number < 10;$number++){
                Seat::create([
                    'row' => $row,
                    'number' => $number
                ]);
            }
        }
    }
}
