import { useState } from "react";
import { Input } from "../input";
import Checkbox from "../checkbox";
import { MainButton } from "../mainButton";
import { Label } from "../ui/label";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { fontBigTypoDesktop, fontBodyNormal, fontCaptionBold, fontCaptionNormal, fontTitle1, fontTitle2 } from "@/styles/typography";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isCodeLogin, setIsCodeLogin] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(''));
  const [otpError, setOtpError] = useState(false);

  const handleLogin = () => {
    if (isCodeLogin) {
      const code = otpValues.join('');
      if (code === '000000') {
        // Success logic
        setOtpError(false);
      } else {
        setOtpError(true);
      }
    } else {
      // Existing email login logic
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);
      setOtpError(false);

      // Move to next input if value is entered
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };
  
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index]) {
      // Move to previous input on backspace if current input is empty
      if (index > 0) {
        const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          const newOtpValues = [...otpValues];
          newOtpValues[index - 1] = '';
          setOtpValues(newOtpValues);
        }
      }
    }
  };

  const renderEmailLogin = () => (
    // ... existing email login form code ...
    <div className="w-full max-w-md flex flex-col gap-4">
      <div className="w-full">
        <Label 
          htmlFor="email" 
          className={cn(fontCaptionBold, "px-4 text-black-60")}
        >
          Email
        </Label>
        <div className="mb-2" />
        <input
          className={cn(
            "block w-full appearance-none border border-black-10 bg-white-60 px-2.5 focus:outline-none",
            "h-[48px] rounded-6 text-black-100 focus:border-black-10",
            "px-4",
          )}
          maxLength={40}
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-full">
        <Label 
          htmlFor="email" 
          className={cn(fontCaptionBold, "px-4 text-black-60")}
        >
          Password
        </Label>
        <div className="mb-2" />
        <div className="relative w-full">
          <input
            className={cn(
              "block w-full appearance-none border border-black-10 bg-white-60 px-2.5 focus:outline-none",
              "h-[48px] rounded-6 text-black-100 focus:border-black-10",
              "px-4",
            )}
            id="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3"
          >
            {showPassword ? (
              <Image src="/eyeoff.svg" alt="Hide Password" width={24} height={24} />
            ) : (
              <Image src="/eye.svg" alt="Show Password" width={24} height={24} />
            )}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          checked={rememberMe}
          onClick={() => setRememberMe(!rememberMe)}
        />
        <Label>Remember me</Label>
        <button 
          onClick={() => setIsCodeLogin(true)}
          className="ml-auto text-[16px] leading-[20px] font-dm-sans font-bold text-black-100 underline underline-offset-1"
        >
          Login with Code
        </button>
      </div>
      <MainButton
        variant="primary"
        onClick={handleLogin}
        disabled={!email || !password}
        className="w-full"
      >
        Sign In
      </MainButton>
    </div>
  );

  const renderCodeLogin = () => (
    <div className="w-full max-w-md flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <Label className={cn(fontCaptionBold, "text-black-60")}>
          Enter 6 digit pin
        </Label>
        <div className="flex gap-1">
          {otpValues.map((value, index) => (
            <input
              key={index}
              type="text"
              name={`otp-${index}`}
              value={value}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(index, e)}
              className={cn(
                "w-12 h-12 text-center rounded-6 border",
                "focus:outline-none focus:border-black-10",
                value ? "bg-black-100 text-white-100" : "bg-white-60 text-black-100",
                otpError ? "border-semantic-red-100" : "border-black-10"
              )}
              maxLength={1}
            />
          ))}
        </div>
        {otpError && (
          <div className="flex items-center gap-1 text-semantic-red-100">
            <Image src="/login-alert.svg" width={16} height={16} alt="Error" />
            <span className={cn(fontCaptionNormal, "text-red-600")}>Entered code is wrong!</span>
          </div>
        )}
      </div>
      <button 
        onClick={() => setIsCodeLogin(false)}
        className="text-[16px] leading-[20px] font-dm-sans font-bold text-black-100 underline underline-offset-1"
      >
        Login with Email
      </button>
      <MainButton
        variant="primary"
        onClick={handleLogin}
        disabled={otpValues.some(v => !v)}
        className="w-full"
      >
        Sign In
      </MainButton>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className={cn(
        "relative hidden lg:flex flex-col w-[480px] items-start m-4",
        "bg-sign-in bg-cover bg-center rounded-6",
        )}
      >
        <div className="absolute inset-0 flex flex-col justify-between rounded-6 p-8 bg-[#FF5634]/50 overflow-hidden">
          <div className="absolute top-[calc(60vh)] rounded-b-6 bottom-[-200px] left-0 right-0 flex bg-gradient-to-t from-black via-black to-black/0 opacity-70" />
          <div className="flex items-center gap-2 z-50">
            <Image
              src="/orderificLogo-icon.svg"
              width={50}
              height={50}
              alt="Orderific Logo"
            />
            <p className={cn("text-white-100", fontTitle2)}>Orderific</p>
          </div>
          <div className="flex flex-col gap-6 z-10">
            <h1 className={cn("text-white-100", fontBigTypoDesktop, " tracking-[-0.08em] font-dm-sans")}>
              Service Panel
            </h1>
            <p className={cn("text-white-100", fontBodyNormal, "tracking-tight")}>
              Streamline your restaurant operations with BMS. Manage
              reservations, orders, inventory, and staff effortlessly, and focus
              on delivering exceptional dining experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        <div className="absolute top-10 flex flex-col gap-4 items-center lg:hidden">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-icon.png"
              width={56}
              height={56}
              alt="Orderific Logo"
            />
            <p 
              className={cn(
                "text-[#FF5634] font-dm-sans font-bold text-[24px] leading-[32px]"
              )}>
              Orderific
            </p>
          </div>
          <h1 className={cn("text-[32px] leading-10 font-bold text-black-100")}>Service Panel</h1>
        </div>
        <div className="flex-1 flex flex-col w-full max-w-[360px] justify-center items-center gap-4">
          <div className="flex flex-col items-center justify-center w-full max-w-md gap-2">
            <h1 className={cn("text-[32px] leading-10 font-bold text-black-100")}>Welcome Back</h1>
            <p 
              className={cn(
                "text-[16px] leading-5 text-black-60 tracking-tight",
              )}
              
            >
              Manage, streamline, and thrive effortlessly.
            </p>
          </div>
          {isCodeLogin ? renderCodeLogin() : renderEmailLogin()}
        </div>
      </div>
    </div>
  )
}