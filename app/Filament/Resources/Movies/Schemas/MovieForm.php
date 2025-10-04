<?php

namespace App\Filament\Resources\Movies\Schemas;

use App\Models\Artist;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
use App\Models\Genre;

class MovieForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('عنوان')
                    ->required(),
                TextInput::make('director')
                    ->label('کارگردان')
                    ->default(null),
                TextInput::make('language')
                    ->label('زبان')
                    ->default(null)
                    ->default('فارسی'),
                TextInput::make('duration')
                    ->label('مدت زمان')
                    ->numeric()
                    ->suffix('دقیقه')
                    ->default(null),
                TextInput::make('release_year')
                    ->label('سال انتشار')
                    ->placeholder('1404')
                    ->integer()
                    ->default(fn()=> verta()->year),
                TextInput::make('country')
                    ->label('کشور')
                    ->default(null)
                    ->default('ایران'),
                TextInput::make('rating')
                    ->label('امتیاز')
                    ->required()
                    ->numeric()
                    ->default(0.0),
                TextInput::make('votes')
                    ->label('تعداد نظر دهندگان')
                    ->required()
                    ->numeric()
                    ->default(0),
                Select::make('genres')
                    ->label('ژانرها')
                    ->multiple()
                    ->relationship('genres', 'name')
                    ->preload()
                    ->searchable()
                    ->columnSpanFull(),
                Select::make('artists')
                    ->label('بازیگران')
                    ->multiple()
                    ->relationship('artists', 'name')
                    ->preload()
                    ->searchable()
                    ->columnSpanFull()
                    ->getOptionLabelFromRecordUsing(fn ($record) => 
                            view('components.artist-option', ['artist' => $record])->render()
                        )
                    ->allowHtml(),
                Textarea::make('trailer_url')
                    ->label('تیزر')
                    ->placeholder('آدرس اینترنتی')
                    ->default(null)
                    ->columnSpanFull(),
                FileUpload::make('poster')
                    ->label('پوستر')
                    ->image()
                    ->disk('public')
                    ->directory('movies')
                    ->visibility('public')
                    ->required()
                    ->columnSpanFull(),
                RichEditor::make('description')
                    ->label('توضیحات')
                    ->default(null)
                    ->columnSpanFull()
                    ->extraInputAttributes([
                        'style' => 'min-height: 300px; direction: rtl; text-align: justify;',
                    ]),
                Toggle::make('is_published')
                    ->label('منتشر شود')
                    ->required()
                    ->default(true),
            ]);
    }
}
