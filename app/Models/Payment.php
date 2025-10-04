<?php

namespace App\Models;

use App\Enums\PaymentMethodEnum;
use App\Enums\PaymentStatusEnum;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'user_id',
        'reservation_id',
        'amount',
        'status',
        'method',
        'transaction_id',
        'paid_at',
        'description'
    ];

    protected $casts = [
        'status' => PaymentStatusEnum::class,
        'method' => PaymentMethodEnum::class
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
