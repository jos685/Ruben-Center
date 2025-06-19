<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\Department;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', function (Request $request) {
    $request->validate([
        'office' => 'required|string',
        'password' => 'required|string',
    ]);

    $department = Department::where('office', $request->office)->first();

    if (!$department || !Hash::check($request->password, $department->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $token = $department->createToken('department-token')->plainTextToken;

    return response()->json([
        'office' => $department->office,
        'token' => $token,
    ]);
  })->name('login');

