import React, { useEffect, useMemo, useRef, useState } from "react";

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function normalizeToAsciiDigits(input) {
	if (!input) return "";
	// Replace Eastern Arabic-Indic (U+06F0..U+06F9) and Arabic-Indic (U+0660..U+0669) with ASCII 0-9
	const replaced = input
		.replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
		.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
	return replaced;
}

function getOnlyDigits(input) {
	const ascii = normalizeToAsciiDigits(input || "");
	return ascii.replace(/\D+/g, "");
}

export default function OtpInput({
	length = 5,
	onChange,
	onComplete,
	disabled = false,
	autoFocus = true,
	className,
	inputClassName,
	inputProps = {},
}) {
	const safeLength = Math.max(1, Number(length) || 1);
	const [values, setValues] = useState(() => Array.from({ length: safeLength }, () => ""));
	const inputsRef = useRef([]);

	// Ensure refs array length stays in sync
	useEffect(() => {
		inputsRef.current = Array.from({ length: safeLength }, (_, i) => inputsRef.current[i] || React.createRef());
		setValues((prev) => {
			const next = Array.from({ length: safeLength }, (_, i) => prev[i] || "");
			return next;
		});
	}, [safeLength]);

	useEffect(() => {
		if (autoFocus && !disabled) {
			focusInput(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoFocus, disabled, safeLength]);

	const code = useMemo(() => values.join(""), [values]);

	useEffect(() => {
		if (typeof onChange === "function") onChange(code);
		if (typeof onComplete === "function" && code.length === safeLength && !values.includes("")) {
			onComplete(code);
		}
	}, [code, onChange, onComplete, safeLength, values]);

	function focusInput(index) {
		const nextIndex = clamp(index, 0, safeLength - 1);
		const ref = inputsRef.current[nextIndex];
		if (ref && ref.current) {
			ref.current.focus();
			ref.current.select();
		}
	}

	function updateValues(nextValues) {
		setValues(nextValues);
	}

	function handleChange(index, e) {
		const raw = e.target.value;
		const digits = getOnlyDigits(raw);

		// Paste or multi-char insert
		if (digits.length > 1) {
			const next = [...values];
			let cursor = index;
			for (let i = 0; i < digits.length && cursor < safeLength; i += 1, cursor += 1) {
				next[cursor] = digits[i];
			}
			updateValues(next);
			const lastFilled = clamp(index + digits.length, 0, safeLength - 1);
			focusInput(lastFilled);
			return;
		}

		// Single char
		const char = digits.slice(0, 1);
		const next = [...values];
		next[index] = char;
		updateValues(next);
		if (char && index < safeLength - 1) {
			focusInput(index + 1);
		}
	}

	function handleKeyDown(index, e) {
		const key = e.key;
		const isCurrentEmpty = values[index] === "";

		if (key === "Backspace") {
			e.preventDefault();
			const next = [...values];
			if (isCurrentEmpty && index > 0) {
				next[index - 1] = "";
				updateValues(next);
				focusInput(index - 1);
			} else {
				next[index] = "";
				updateValues(next);
			}
			return;
		}

		if (key === "ArrowLeft") {
			e.preventDefault();
			focusInput(index - 1);
			return;
		}
		if (key === "ArrowRight") {
			e.preventDefault();
			focusInput(index + 1);
			return;
		}
		if (key === "Home") {
			e.preventDefault();
			focusInput(0);
			return;
		}
		if (key === "End") {
			e.preventDefault();
			focusInput(safeLength - 1);
			return;
		}
		if (key === "Enter") {
			if (typeof onComplete === "function" && values.every((v) => v !== "")) {
				onComplete(values.join(""));
			}
		}
	}

	function handlePaste(index, e) {
		e.preventDefault();
		const pasted = getOnlyDigits(e.clipboardData.getData("text"));
		if (!pasted) return;
		const next = [...values];
		let cursor = index;
		for (let i = 0; i < pasted.length && cursor < safeLength; i += 1, cursor += 1) {
			next[cursor] = pasted[i];
		}
		updateValues(next);
		const lastFilled = clamp(index + pasted.length, 0, safeLength - 1);
		focusInput(lastFilled);
	}

	return (
		<div className={className} dir="ltr">
			{/** Default inline styles to ensure visibility; can be overridden via inputProps.style */}
			{Array.from({ length: safeLength }).map((_, i) => {
				const defaultStyles = {
					width: 44,
					height: 48,
					textAlign: "center",
					fontSize: 18,
					border: "1px solid #ccc",
					borderRadius: 8,
					background: "#fff",
					color: "#111",
					marginInlineEnd: 8,
				};
				return (
					<input
						key={i}
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						maxLength={1}
						value={values[i]}
						disabled={disabled}
						ref={inputsRef.current[i]}
						onChange={(e) => handleChange(i, e)}
						onKeyDown={(e) => handleKeyDown(i, e)}
						onPaste={(e) => handlePaste(i, e)}
						className={inputClassName}
						aria-label={`OTP digit ${i + 1}`}
						style={{ ...defaultStyles, ...(inputProps.style || {}) }}
						{...inputProps}
					/>
				);
			})}
		</div>
	);
}


