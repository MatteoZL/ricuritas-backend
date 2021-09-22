import request from 'supertest';
import app from '../app';

describe('Probar los productos', () => {
    jest.setTimeout(10000)

    const productStructure = {
        "id": expect.any(Number),
        "name": expect.any(String),
        "description": expect.any(String),
        //"iva": expect.any(Number),
        //"available": expect.any(Boolean),
        "details": expect.any(String),
        "category_id": expect.any(Number),
        "units": expect.any(Number), //Regex
        //"unit_price": expect.any(Number),
        //"promotion": null,
        "category_name": expect.any(String)
    };

    test('Los productos deben tener las estructura deseada', (done) => {
        request(app).get('/api/product').then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('products');
            response.body.products.forEach((product: any) => {
                // expect(product).toHaveProperty('id')
                // expect(product).toHaveProperty('name')
                // expect(product).toHaveProperty('unit_price')
                // expect(product).toHaveProperty('description')
                // expect(product).toHaveProperty('category_name')
                expect(product).toMatchObject(productStructure);
            })
            done();
        })
    })
})

describe('Probar el login', () => {

    const user = {email: "pruebas@testing.com", password: "prueba123"}

    test('El login debe retornar un token ante credenciales correctas', (done) => {
        request(app).post('/api/auth/signin')
            .set('Content-type', 'application/json')
            .send(user)
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.Authorization).toBeGreaterThanOrEqual(140)
        })
        done()
    })
})
