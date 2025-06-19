<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{

    public function run(): void {

      $departments = [
          'registration',
           'pharmacy',
           'consultation_office_1',
           'consultation_office_2',
           'consultation_office_3',
           'dentist_office_1',
            'dentist_office_2',
            'maternity_office_1',
            'maternity_office_2',
        ];

        foreach ($departments as $dept) {
            Department::create([
                'office' => $dept,
                'password' => Hash::make('@@MkJS54321'), // Default password for all departments
            ]);
        }

    }
 
}
