declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
	}

	interface Process {
		env: ProcessEnv;
	}
}
