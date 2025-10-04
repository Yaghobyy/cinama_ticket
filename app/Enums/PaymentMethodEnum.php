<?php

namespace App\Enums;

use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

enum PaymentMethodEnum :  string implements HasLabel
{
    case CASH = 'cash';   // کارت نقدی
    case GATEWAY = 'gateway'; // درگاه پرداخت بشار

    public function getLabel(): string|Htmlable|null
    {
        return match ($this) {
            self::CASH => 'نقدی',
            self::GATEWAY => 'درگاه پرداخت',
        };
    }
}
