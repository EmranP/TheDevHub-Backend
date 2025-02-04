import chalk from 'chalk'
import dotenv from 'dotenv'
import express from 'express'
// Config & Middlewares
import { connectDB } from 'config/db'
import { defaultAppMiddleware } from 'middlewares/defaultMiddlewaresConfig'
// Routes
import routeAuthRegister from 'routes/auth/register.route'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4200

// Routes =================

app.use('/api/auth', routeAuthRegister)

// Start Server ===========

const startApp = async (): Promise<void> => {
	try {
		// Подключение к базе данных
		await connectDB()

		// Инициализация middleware
		defaultAppMiddleware(app, express)

		// Запуск сервера
		app.listen(PORT, () => {
			console.log(chalk.yellow(`🚀 Сервер запущен на http://localhost:${PORT}`))
		})
	} catch (error) {
		console.error(chalk.red('❌ Ошибка запуска сервера:'), error)
		process.exit(1)
	}
}

startApp()
