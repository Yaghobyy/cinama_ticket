<?php

namespace App\Filament\Resources\Movies\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class MoviesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('عنوان')
                    ->searchable(),
                ImageColumn::make('poster')
                    ->label('پوستر')
                    ->disk('public')
                    ->visibility('public'),
                TextColumn::make('language')
                    ->label('زبان')
                    ->searchable(),
                TextColumn::make('director')
                    ->label('کارگردان')
                    ->searchable(),
                TextColumn::make('duration')
                    ->label('مدت زمان')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('release_year')
                    ->label('سال انتشار')
                    ->sortable(),
                TextColumn::make('country')
                    ->label('کشور')
                    ->searchable(),
                TextColumn::make('rating')
                    ->label('امتیاز')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('votes')
                    ->label('تعداد نظر دهندگان')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('genres.name')
                    ->label('ژانرها')
                    ->badge()
                    ->separator(', '),
                TextColumn::make('trailer_url')
                    ->label('تیزر')
                    ->searchable(),
                IconColumn::make('is_published')
                    ->label('منتشر شود')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label('ایجاد شده در')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('به‌روزرسانی شده در')
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
