<?php

namespace App\Filament\Resources\ShowTimes\Schemas;

use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\RawJs;

class ShowTimeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('movie_id')
                    ->label('فیلم')
                    ->required()
                    ->relationship('movie','title')
                    ->preload()
                    ->searchable(),
                DatePicker::make('show_date')
                    ->label('تاریخ نمایش')
                    ->required()
                    ->jalali(),
                TimePicker::make('start_time')
                    ->label('ساعت شروع')
                    ->required()
                    ->seconds(false)
                    ->displayFormat('H:i')
                    ->rule(function (Get $get) {
                        return Rule::unique('show_times', 'start_time')
                            ->ignore($get('id'))
                            ->where(function ($query) use ($get) {
                                return $query->where('show_date', $get('show_date'));
                            });
                    })
                    ->live()
                    ->afterStateUpdated(function ($state, Set $set) {
                        if (empty($state)) {
                            return;
                        }

                        $startTime = Carbon::createFromFormat('H:i', $state);

                        if ($startTime === false) {
                            return;
                        }

                        $endTime = $startTime->copy()->addHours(2)->format('H:i');
                        $set('end_time', $endTime);
                    }),
                TimePicker::make('end_time')
                    ->label('ساعت پایان')
                    ->required()
                    ->seconds(false)
                    ->displayFormat('H:i'),
                TextInput::make('price')
                    ->label('قیمت')
                    ->required()
                    ->numeric()
                    ->mask(RawJs::make('$money($input)'))
                    ->stripCharacters(',')
                    ->suffix('تومان'),
            ]);
    }
}
