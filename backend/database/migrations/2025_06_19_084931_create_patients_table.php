<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table){    
        $table->id();
        $table->string('name');
        $table->string('phone');
        $table->enum('gender', ['Male', 'Female']); // gender
        $table->integer('age'); //  age
        $table->string('assigned_office'); // consultation office
        $table->boolean('has_paid')->default(false);
        $table->string('payment_method')->nullable(); // Cash or Paybill
        $table->enum('status', ['waiting', 'seen'])->default('waiting');
        $table->timestamps();        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
