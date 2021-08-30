import { PrismaClient, LockerTimeLimit } from '@prisma/client'
import { Router } from 'express'

const prisma = new PrismaClient
export const router = Router()

router.get('/users', async (req, res, next) => {
	async function main(){
		const { user } = prisma
		return await user.findMany()
	}
	const users = await main()
	res.json(users)
})

router.get('/user/id/:id', async (req, res, next) => {
	const { id } = req.params
	async function main(){
		const { user } = prisma
		return await user.findUnique({
			where: { id: parseInt(id) }
		})
	}
	try{
		const user = await main()
		if(!user) res.status(202).json({})
		else res.json(user)
	}catch(e){ 
		console.log(e)
		res.status(203).json({}) 
	}
})

router.get('/user/email/:email', async (req, res, next) => {
	const { email } = req.params
	async function main(){
		const { user } = prisma
		return await user.findUnique({
			where: { email }
		})
	}
	try{
		const user = await main()
		if(!user) res.status(202).json({})
		else res.json(user)
	}catch(e){ 
		console.log(e) 
		res.status(203).json({}) 
	}
})

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
	}catch(e){ 
		console.log(e)
		res.status(203).send('error') 
	}
})

router.post('/lockertimelimit/:id', async (req, res, next) => {
	const { id } = req.params
	const data: LockerTimeLimit  = req.body.data || req.body

	const { lockerTimeLimit } = prisma
	async function main(){
		return await lockerTimeLimit.upsert({
			where: { id: parseInt(id) },
			update: data,
			create: data,
		})
	}
	try{
		let status, description
		const query = await main()
		if(query){
			status = true
			description = 'ok'
		} else {
			status = false
			description = 'error'
		}
		res.json({ status, description, })
	} catch (e) { 
		console.log(e) 
		res.status(202)
	}
})

type ID = {
	id: number
}