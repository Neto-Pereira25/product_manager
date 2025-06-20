import { Router } from 'express';
import { CouponController } from '../controllers/CouponController';

const couponRouter = Router();
const controller = new CouponController();

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: Endpoints para gerenciamento de cupons promocionais
 */

/**
 * @swagger
 * /coupons:
 *   post:
 *     summary: Cria um novo cupom promocional
 *     tags: [Coupons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code, type, value, oneShot, validFrom, validUntil]
 *             properties:
 *               code:
 *                 type: string
 *                 example: PROMO10
 *               type:
 *                 type: string
 *                 enum: [percent, fixed]
 *               value:
 *                 type: number
 *               oneShot:
 *                 type: boolean
 *               validFrom:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-06-18T12:00:00.000Z
 *               validUntil:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Cupom criado com sucesso
 *       200:
 *         description: Cupom restaurado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Código de cupom já existe
 */
couponRouter.post('/', controller.create);

/**
 * @swagger
 * /coupons:
 *   get:
 *     summary: Lista todos os cupons cadastrados
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: Lista de cupons
 */
couponRouter.get('/', controller.list);

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     summary: Retorna um cupom pelo ID
 *     tags: [Coupons]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cupom encontrado
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Cupom não encontrado
 */
couponRouter.get('/:id', controller.getById);

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     summary: Atualiza um cupom existente
 *     tags: [Coupons]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *               oneShot:
 *                 type: boolean
 *               validUntil:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Cupom atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Cupom não encontrado
 */
couponRouter.put('/:id', controller.update);

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Deleta (soft delete) um cupom
 *     tags: [Coupons]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Cupom deletado com sucesso
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Cupom não encontrado
 */
couponRouter.delete('/:id', controller.remove);

export default couponRouter;