<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use App\Models\Department;
use App\Models\Patient;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



// Login route for departments
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



//registering a new patient
  Route::middleware('auth:sanctum')->post('/patients', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string',
        'phone' => 'required|string',
        'gender' => 'required|in:Male,Female',
        'age' => 'required|integer|min:0',
        'assigned_office' => 'required|string',
        'has_paid' => 'required|boolean',
        'payment_method' => 'nullable|string|in:Cash,Paybill',
    ]);

    $patient = Patient::create($validated);

    return response()->json([
        'message' => 'Patient registered successfully',
        'data' => $patient,
    ])->setStatusCode(201);
});


//get patients registered that day
Route::middleware('auth:sanctum')->get('/patients', function () {
    // Optionally limit to today's patients only
    return Patient::whereDate('created_at', now()->toDateString())->latest()->get();
});

//get patients for the doctor who are waiting to be seen
Route::middleware('auth:sanctum')->get('/patients/waiting/{office}', function ($office) {
    $patients = Patient::where('assigned_office', $office)
        ->where('seen', false)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json($patients);
});
