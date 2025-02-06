import chalk from 'chalk'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
// Config & Middlewares
import { connectDB } from 'config/db'
import { defaultAppMiddleware } from 'middlewares/defaultMiddlewaresConfig'
// import { authenticated } from 'middlewares/authenticated.middleware'
// Routes
// Auth
import routeAuth from 'routes/auth.route'
// import routeAuthRegister from 'routes/user/register.route'
// import routeAuthLogin from 'routes/user/login.route'
// import routeAuthLogout from 'routes/user/logout.route'
// Roles
import routeRoles from 'routes/user/roles.route'
// Users
// import routeUsersGet from 'routes/user/usersGet.route'
// import routeUsersEdit from 'routes/user/edit.route'
// import routeUsersRemove from 'routes/user/delete.route'
// Post
// import routePostGet from 'routes/post/getPost.route'
// import routePostAdd from 'routes/post/addPost.route'
// import routePostEdit from 'routes/post/editPost.route'
// import routePostRemove from 'routes/post/deletePost.route'
// import routeCommentAdd from 'routes/comment/addComment.route'
// import routeCommentRemove from 'routes/comment/deleteComment.route'
import routePost from 'routes/post.route'
import routeUsers from 'routes/user.route'

// ! Todo: Controller & Route Comment

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4200

// Инициализация middleware
defaultAppMiddleware(app, express)

// Routes =================

// Auth
app.use('/api/auth', routeAuth)

// Post
app.use('/api/posts', routePost)

// Middleware Auth ===================
// app.use(authenticated)

// Users
app.use('/api/users', routeUsers)

// Roles
app.use('/api/users/roles', routeRoles)

// Post
// app.use('/api/post', routePostAdd)
// app.use('/api/post', routePostEdit)
// app.use('/api/post', routePostRemove)

// Comments
// app.use('/api/post', routeCommentAdd)
// app.use('/api/post', routeCommentRemove)

// Глобальный обработчик ошибок
app.use((err: Error, req: Request, res: Response, next:NextFunction): void => {
	console.error(`[ERROR]: ${err.message}`)
	res.status(500).json({
			error: 'Internal Server Error',
			message: err.message,
		})
	}
)


// Start Server ===========

const startApp = async (): Promise<void> => {
	try {
		// Подключение к базе данных
		await connectDB()

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
