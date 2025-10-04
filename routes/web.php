<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Panel\PanelController;

Route::get('/', [HomeController::class,'index'])->name('home');

Route::get('movies', [MovieController::class,'index'])->name('movies');

Route::get('movies/{movie}', [MovieController::class,'show'])->name('movies.show');
Route::get('movies/{movie}/{date}', [MovieController::class,'showTimes'])->name('movies.showTimes');

Route::middleware('auth')->group(function(){
    Route::post('/reservation',[MovieController::class,'reservation'])->name('movies.reservation');
});

// panel routes
Route::middleware('auth')->prefix('/panel')->name('panel.')->group(function(){
    Route::get('/',[PanelController::class,'index'])->name('index'); 
    Route::get('/my-bookings',[PanelController::class,'myBookings'])->name('mybookings'); 
    Route::get('/payment/{reservation}',[PanelController::class,'payment'])->name('payment'); 
    Route::get('/payment/{payment}/callback',[PanelController::class,'paymentCallback'])->name('payment.callback'); 
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
