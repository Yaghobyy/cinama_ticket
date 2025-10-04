<?php

namespace App\Filament\Resources\Payments\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PaymentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('reservation.user.name')
                    ->label('پرداخت کننده')
                    ->searchable(),
                TextColumn::make('amount')
                    ->label('مبلغ(تومان)')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('status')
                    ->label('وضعیت')
                    ->searchable(),
                TextColumn::make('method')
                    ->label('روش پرداخت')
                    ->searchable(),
                TextColumn::make('transaction_id')
                    ->label('شماره پردخت')
                    ->searchable(),
                TextColumn::make('paid_at')
                    ->label('پرداخت شده در')
                    ->dateTime()
                    ->jalaliDate('Y/m/d H:i')
                    ->sortable(),
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
