<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admin')->insert([
            'id' => 1,
            'email' => 'pthanhphong156@gmail.com',
            'password' => Hash::make('123456'),
            'active' => 1,
            'role_id' => 1
        ]);
    }
}
