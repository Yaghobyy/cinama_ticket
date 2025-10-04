<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

enum ReservationStatusEnum: string implements HasLabel
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case CANCELLED = 'cancelled';
    case EXPIRED = 'expired';

    public function getLabel(): string|Htmlable|null
    {
        return match($this){
            self::PENDING => 'در انتظار پرداخت',
            self::PAID => 'پرداخت شده',
            self::CANCELLED => 'لغو شده',
            self::EXPIRED => 'منقضی شده',
        };
    }
}

