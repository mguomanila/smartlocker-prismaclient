import { PrismaClient } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient
export const router = Router()

router.get('/lockertimelimit/:id', async (req, res, next) => {
	const { id } = req.params
	const { lockerTimeLimit } = prisma
	async function main(){
		return await lockerTimeLimit.findUnique({
			where: { id: parseInt(id) }
		})
	}
	try{
		const query = await main()
		if(!query){
			res.status(202).send('error')
		} else {
			res.json(query)
		}
	}catch(e){ res.status(203).send('error') }
})

router.get('/users', async (req, res, next) => {
	async function main(){
		const { user } = prisma
		return await user.findMany()
	}
	const users = await main()
	res.json(users)
})

router.get('/user/:id', async (req, res, next) => {
	const { id } = req.params
	async function main(){
		const { user } = prisma
		return await user.findUnique({
			where: { id: parseInt(id) }
		})
	}
	const user = await main()
	res.json(user)
})

router.post('/lockertimelimit/:id', async (req, res, next) => {
	const { id } = req.params
	const data = req.body.data || req.body

	const { lockerTimeLimit } = prisma
	async function main(){
		return await lockerTimeLimit.update({
			where: { id: parseInt(id) },
			data
		})
	}
	let status, description
	const query = await main()
	console.log('post', query)
	if(query){
		status = true
		description = 'ok'
	} else {
		status = false
		description = 'error'
	}
	res.json({
		status,
		description,
	})
})
