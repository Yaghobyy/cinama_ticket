<?php

namespace App\Http\Controllers\Panel;

use App\Enums\PaymentStatusEnum;
use App\Enums\ReservationStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Paymen;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment as ShetabitPayment;

class PanelController extends Controller
{
    

    public function index(){
        $reservations = Reservation::where('user_id',auth()->id())->with('seats')->get();
        
        return Inertia::render('panel/panel',[
            'reservation_count' => $reservations->count(),
            'seat_count' => $reservations->sum(fn($reservation) => $reservation->seats->count()),
        ]);
    }

    public function myBookings(){
        $reservations = Reservation::where('user_id',auth()->id())
            ->with('showTime.movie')->with('seats')->with('payments')
            ->orderBy('reserved_at','desc')->get();
        
        
        return Inertia::render('panel/myBooking',[
            'reservations' => $reservations
        ]);
    }

    public function payment(Reservation $reservation){
        
        $invoice = new Invoice();
        $invoice->amount($reservation->price);

        $payment = $reservation->payments()->create([
            'amount' => ($reservation->price * $reservation->seats()->count() )
        ]);

        return ShetabitPayment::callbackUrl(route('panel.payment.callback', $payment->id))->purchase($invoice, function($driver, $transactionId) use ($payment){
           $payment->update([
            'transaction_id' => $transactionId
           ]);
        })->pay()->render();
    }

    public function paymentCallback(Payment $payment){
        
        $isPaid = true;

        try {
            $receipt = ShetabitPayment::amount($payment->amount)->transactionId($payment->transaction_id)->verify();

            $payment->update([
                'status' => PaymentStatusEnum::PAID,
                'transaction_id' => $receipt->getReferenceId(),
                'paid_at' => now(),
            ]);

            $payment->reservation()->update([
                'status' => ReservationStatusEnum::PAID,
            ]);
        
            
        } catch (InvalidPaymentException $exception) {
           
            $isPaid = false;
            $payment->update([
                'status' => PaymentStatusEnum::FAILED,
            ]);
        }

        return redirect()->route('panel.mybookings',[
            'is_paid' => $isPaid
        ]);

    }
}
