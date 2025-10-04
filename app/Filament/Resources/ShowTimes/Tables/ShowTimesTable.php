<?php

namespace App\Filament\Resources\ShowTimes\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ShowTimesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('show_date','desc')
            ->columns([
                TextColumn::make('movie.title')
                    ->label('فیلم')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('show_date')
                    ->label('تاریخ نمایش')
                    ->jalaliDate('Y/m/d')
                    ->sortable(),
                TextColumn::make('start_time')
                    ->label('ساعت شروع')
                    ->time('H:i')
                    ->sortable(),
                TextColumn::make('end_time')
                    ->label('ساعت پایان')
                    ->time('H:i')
                    ->sortable(),
                TextColumn::make('price')
                    ->label('(تومان)قیمت')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('تاریخ ایجاد')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('تاریخ بروزرسانی')
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
