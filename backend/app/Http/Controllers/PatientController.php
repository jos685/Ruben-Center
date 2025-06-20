<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Patient;

class PatientController extends Controller
{
    // Store a new patient
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'gender' => 'required|in:Male,Female',
            'age' => 'required|integer|min:0',
            'assigned_office' => 'required|string',
            'has_paid' => 'required|boolean',
            'payment_method' => 'required|string|in:Cash,Paybill',
        ]);

        $patient = Patient::create($validated);

        return response()->json([
            'message' => 'Patient registered successfully',
            'data' => $patient,
        ], 201);
    }
}
