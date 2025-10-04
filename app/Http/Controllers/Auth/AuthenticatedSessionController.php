<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Otp;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;
use Melipayamak\Melipayamak;

class AuthenticatedSessionController extends Controller
{

   
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        $redirect = $request->query('redirect');
        if ($redirect) {
            $request->session()->put('auth.redirect', $redirect);
        }

        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
            'redirect' => $redirect,
        ]);
    }

    public function showOtp(Request $request): Response
    {
        $redirect = $request->query('redirect') ?? $request->session()->get('auth.redirect');
        return Inertia::render('auth/otp', [
            'redirect' => $redirect,
        ]);
    }


    public function sendOtp(Request $request)
    {
        $request->validate([
            'mobile' => 'required|string',
        ]);
    

        $mobile = $request->mobile;

        $otpCode = '';

        // check is exists not  expired coede
        if($otp = Otp::where('mobile',$mobile)->where('expires_at','>',now())->where('is_used',0)->first()){
            $otpCode = $otp->otp;
        }else{
            do{
                $otpCode = rand(10000, 99999);
            }while(Otp::where('otp',$otpCode)->exists());
        
            Otp::create([
                'mobile' => $mobile,
                'otp' => $otpCode,
                'expires_at' => now()->addMinutes(5)
            ]);
        }
        

        // try{

        //     $sms = Melipayamak::sms();
        //     $to = $mobile;
        //     $from = '5000...';
        //     $text = 'کد یکبار مصرف شما برای ورود به حساب کاربری شما '.$otp;
        //     $response = $sms->send($to,$from,$text);
        //     $json = json_decode($response);
        //     echo $json->Value; //RecId or Error Number 
        // }catch(Exception $e){
        //     echo $e->getMessage();
        // }

        $redirect = $request->query('redirect') ?? $request->session()->get('auth.redirect');
        $params = [];
        if ($redirect) {
            $params['redirect'] = $redirect;
        }
        return redirect()->route('login.otp', $params);

        // return Inertia::render('auth/login', [
        //     'is_otp' => true
        // ]);
    }

    public function loginOtp(Request $request)
    {
        $request->validate([
            'mobile' => ['required'],
            'otp' => ['required'],
        ]);

        if (!Otp::where('mobile', $request->mobile)
            ->where('otp', $request->otp)->latest()->exists()) {
            return to_route('login.otp')->withErrors(['otp' => 'کد وارد شده اشتباه است']);
        }

        if (!Otp::where('mobile', $request->mobile)
            ->where('otp', $request->otp)
            ->where('expires_at', '>', now())->latest()->exists()) {
            return to_route('login.otp')->withErrors(['otp' => 'کد وارد شده منقضی شده است']);
        }

        if (Otp::where('mobile', $request->mobile)
            ->where('otp', $request->otp)
            ->where('is_used', 1)->latest()->exists()) {
            return to_route('login.otp')->withErrors(['otp' => 'کد وارد شده استفاده شده است']);
        }

        $otp = Otp::where('mobile', $request->mobile)
            ->where('otp', $request->otp)->latest()->first();

        $otp->update([
            'is_used' => true,
        ]);

        $user = User::where('mobile', $request->mobile)->first();
        

        if (!$user) {
            $user = User::create([
                'mobile' => $request->mobile,
                'name' => $request->mobile,
            ]);
        }

        Auth::login($user);
        session()->regenerate();

        $redirect = $request->query('redirect') ?? $request->input('redirect') ?? $request->session()->pull('auth.redirect');
        if ($redirect && is_string($redirect)) {
            if (str_starts_with($redirect, '/') && !str_starts_with($redirect, '//')) {
                return redirect()->to($redirect);
            }
        }

        return to_route('panel.index');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $user = $request->validateCredentials();

        if (Features::enabled(Features::twoFactorAuthentication()) && $user->hasEnabledTwoFactorAuthentication()) {
            $request->session()->put([
                'login.id' => $user->getKey(),
                'login.remember' => $request->boolean('remember'),
            ]);

            return to_route('two-factor.login');
        }

        Auth::login($user, $request->boolean('remember'));

        $request->session()->regenerate();

        $redirect = $request->query('redirect') ?? $request->input('redirect');
        if ($redirect && is_string($redirect)) {
            if (str_starts_with($redirect, '/') && !str_starts_with($redirect, '//')) {
                return redirect()->to($redirect);
            }
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
