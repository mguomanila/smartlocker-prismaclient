import { PrismaClient, LockerTimeLimit, LockerUserType } from '@prisma/client'
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
			where: { userIds: parseInt(id) }
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
			where: { userIds: parseInt(id) },
			update: data,
			create: Object.assign(data, {userIds: parseInt(id)}),
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
router.get('/lockerusertypes/:id', async (req, res, next) => {
	const { id } = req.params
	console.log('id', id)
	async function main(){
		return await prisma.lockerUserType.findMany({
			where: {userIds: parseInt(id)},
		})
	}
	try{
		const q = await main()
		if(!q){
			res.status(202).send('error')
		} else {
			res.json(q)
		}
	} catch(e){
		console.log(e)
		res.status(202)
	}
})
router.post('/lockerusertypes', async (req, res, next) => {
	const data: LockerUserType[]  = req.body.data || req.body

	const { lockerUserType } = prisma
	const query: number[] = []
	async function main(){
		await Promise.all(
			data.map(async (lockerType) => {
				const { id }: {id: number} = lockerType
				const qr = await lockerUserType.upsert({
					where: { id: parseInt(`${id}`) },
					update: lockerType,
					create: lockerType,
					select: { id: true }
				})
				query.push(qr.id)
			})
		)
	}
	try{
		let status, description
		await main()
		if(query.length){
			status = true
			description = `saved ${query.length} items`
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