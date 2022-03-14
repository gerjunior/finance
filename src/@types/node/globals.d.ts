declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		DATABASE_URL: string;
	}

	interface Process {
		env: ProcessEnv;
	}
}
