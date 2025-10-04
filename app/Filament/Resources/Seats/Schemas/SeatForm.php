<?php

namespace App\Filament\Resources\Seats\Schemas;

use Illuminate\Validation\Rule;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class SeatForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('row')
                    ->label('ردیف')
                    ->searchable()
                    ->options(fn () => array_combine(range('A', 'Z'), range('A', 'Z')))
                    ->preload()
                    ->required(),
                TextInput::make('number')
                    ->label('شماره')
                    ->required()
                    ->rule(function (Get $get) {
                        return Rule::unique('seats', 'number')
                            ->ignore($get('id'))
                            ->where(function ($query) use ($get) {
                                return $query->where('row', $get('row'));
                            });
                    })
                    ->minValue(1)
                    ->numeric(),
            ]);
    }
}
