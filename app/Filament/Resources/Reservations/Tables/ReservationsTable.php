<?php

namespace App\Filament\Resources\Reservations\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ReservationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at','desc')
            ->columns([
                TextColumn::make('user.name')
                    ->label('رزرو کننده')
                ,
                TextColumn::make('showTime.title')
                    ->label('سانس')
                   ,
                TextColumn::make('seats.title')
                    ->label('صندلی')   
                    ->badge(),
                TextColumn::make('price')
                    ->label('قیمت')
                    ->suffix('ت')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('reserved_at')
                    ->label('تاریخ رزور')
                    ->jalaliDate('Y/m/d')
                    ->sortable(),
                TextColumn::make('status')
                    ->label('وضعیت')
                    ->badge()
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
