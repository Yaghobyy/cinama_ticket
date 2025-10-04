<?php

namespace App\Filament\Resources\Reservations\Schemas;

use App\Enums\ReservationStatusEnum;
use App\Filament\Forms\Components\SeatSelect;
use App\Models\Movie;
use App\Models\Reservation;
use App\Models\ReservationSeat;
use App\Models\Seat;
use App\Models\ShowTime;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\RawJs;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class ReservationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('کاربر')
                    ->relationship('user', 'name')
                    ->required()
                    ->preload()
                    ->searchable(),
                    Select::make('movie_id')
                        ->label('فیلم')
                        ->options(Movie::all()->pluck('title', 'id'))
                        ->required()
                        ->preload()
                        ->searchable(),
                    Select::make('show_time_id')
                        ->label('سانس')
                        ->options(function(Get $get){
                            $movieId = $get('movie_id');
                            return ShowTime::where('movie_id', $movieId)->get()->map(function($item){
                                $key = $item->id;
                                $value = verta($item->show_date)->format('Y/m/d') . ' -> ' .
                                Carbon::parse($item->start_time)->format('H:i') . ':' .
                                Carbon::parse($item->end_time)->format('H:i');

                                return ['key' => $key,'value' => $value];
                            })->pluck('value','key');
                        })
                        ->preload()
                        ->live()
                        ->searchable()
                        ->required()
                        ->afterStateUpdated(function ($state, Set $set) {
                            $showTime = ShowTime::find($state);
                            
                            $set('price', $showTime->price);
                        }),
                TextInput::make('price')
                    ->label('مبلغ')
                    ->required()
                    ->numeric()
                    ->live(onBlur:true)
                    ->suffix('تومان')
                    ->mask(RawJs::make('$money($input)'))
                    ->stripCharacters(','),
                DatePicker::make('reserved_at')
                    ->label('تاریخ رزرو')
                    ->required()
                    ->jalali(),
                Select::make('status')
                    ->label('وضعیت')
                    ->options(ReservationStatusEnum::class)
                    ->default(ReservationStatusEnum::PENDING)
                    ->required(),
                Select::make('seats')
                    ->label('صندلی ها')
                    
                    ->multiple()
                    ->live()
                    ->searchable()
                    ->preload()
                    ->relationship('seats','id')
                    ->getOptionLabelFromRecordUsing(function($record){
                        return $record->title;
                    })
                    ->options(function(Get $get){
                        $showTimeId = $get('show_time_id');  
                        $seats = Reservation::where('show_time_id', $showTimeId)
                        ->with('seats')
                        ->get()
                        ->flatMap(fn($r) => $r->seats->pluck('id'))
                        ->toArray();
                        return Seat::whereNotIn('id', $seats)->orderBy('row')->orderBy('number')->get()
                            ->map(function($item){
                                $key = $item->id;
                                $value = $item->row . $item->number;
                                return ['key' => $key,'value' => $value];
                            })->pluck('value','key');
                    })  
                    
                    ->afterStateUpdated(function($state,Set $set,Get $get){
                        $price = ShowTime::find($get('show_time_id'))->price ?? 0;

                       if(count($state) > 0){
                        $set('price',($price * count($state)));
                       } 
                    }),
                SeatSelect::make('seat_slect')
                    ->label('صندلی ها')
                    ->relationship('seats','id')
                    ->seats(function(){
                        return Seat::all()->groupBy('row')->map(fn ($group) => $group->toArray())
                        ->toArray();;
                    })


                    
            ]);
    }
}
