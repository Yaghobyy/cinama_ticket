<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

enum PaymentStatusEnum : string implements HasLabel
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';

   public function getLabel(): string|Htmlable|null
   {
        return match($this){
            self::PENDING => 'در انتظار پرداخت',
            self::PAID => 'پرداخت شده',
            self::FAILED => 'با شکست مواجه شده',
            self::REFUNDED => 'بازپرداخت شده',
        };
   }
}
