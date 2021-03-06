<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

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
            [
                'id' => 1,
                'name' => 'Thanh Phong',
                'email' => 'pthanhphong156@gmail.com',
                'password' => Hash::make('123456'),
                'active' => 1,
                'role_id' => 1,
                'created_at' => Carbon::now('UTC'),
                'updated_at' => Carbon::now('UTC')
            ],
            [
                'id' => 2,
                'name' => 'Đạt Lok',
                'email' => 'datht@mix.net.vn',
                'password' => Hash::make('hoangtiendat'),
                'active' => 1,
                'role_id' => 1,
                'created_at' => Carbon::now('UTC'),
                'updated_at' => Carbon::now('UTC')
            ],
        ]);
    }
}
