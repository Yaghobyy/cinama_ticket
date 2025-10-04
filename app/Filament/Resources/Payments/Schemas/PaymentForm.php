<?php

namespace App\Filament\Resources\Payments\Schemas;

use App\Enums\PaymentStatusEnum;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class PaymentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('reservation_id')
                    ->required()
                    ->numeric(),
                TextInput::make('amount')
                    ->required()
                    ->numeric(),
                Select::make('status')
                    ->options(PaymentStatusEnum::class)
                    ->default('pending')
                    ->required(),
                TextInput::make('method')
                    ->required()
                    ->default('gateway'),
                TextInput::make('transaction_id')
                    ->default(null),
                DateTimePicker::make('paid_at'),
                DateTimePicker::make('description'),
            ]);
    }
}
