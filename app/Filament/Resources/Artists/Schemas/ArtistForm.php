<?php

namespace App\Filament\Resources\Artists\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ArtistForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('نام بازیگر')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                FileUpload::make('image')
                    ->label('تصویر')
                    ->image()
                    ->disk('public')
                    ->directory('artists')
                    ->visibility('public') 
                    ->columnSpanFull(),
                Textarea::make('description')
                    ->label('توضیحات') 
                    ->maxLength(255)
                    ->columnSpanFull(),    

            ]);
    }
}
