<?php

namespace App\Models;

use App\Enums\ReservationStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'status' => ReservationStatusEnum::class,
    ];

    public function showTime() : BelongsTo 
    {
        return $this->belongsTo(ShowTime::class);    
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function seats() : BelongsToMany
    {
        return $this->belongsToMany(Seat::class, 'reservation_seats', 'reservation_id', 'seat_id');
    }

    public function payments() : HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
