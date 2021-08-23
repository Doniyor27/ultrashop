import fs from 'fs'
import path from 'path'

const GETCATEGORY = (req, res) => {
    let category = fs.readFileSync(path.join(process.cwd(),'src','database','categorys.json'), 'UTF-8')
    let subCategory = fs.readFileSync(path.join(process.cwd(),'src','database','subcategorys.json'), 'UTF-8')
    let categoryJsonParse = JSON.parse(category)
    let subCategoryJsonParse = JSON.parse(subCategory)

    for(let i of categoryJsonParse) {
        let arr = []
        for(let g of subCategoryJsonParse) {
            if(i.category_id == g.category_id) {
                let obj = {
                    subCategoryId: g.sub_category_id,
                    subCategoryName: g.sub_category_name
                }
                arr.push(obj)
            }
        }
        i.subCategory = arr

    }

    res.send(categoryJsonParse)
}

const GETSUBCATEGORY = (req, res) => {
    let subCategory = fs.readFileSync(path.join(process.cwd(),'src','database','subcategorys.json'), 'UTF-8')
    let products = fs.readFileSync(path.join(process.cwd(),'src','database','products.json'), 'UTF-8')
    let subCategoryJsonParse = JSON.parse(subCategory)
    let productsJsonParse = JSON.parse(products)

    for(let i of subCategoryJsonParse) {
        let arr = []
        for(let g of productsJsonParse) {
            console.log(g);
            if(i.sub_category_id == g.sub_category_id) {
                let obj = {
                    productId: g.product_id,
					productName: g.product_name,
					model: g.model,
					price: g.price,
					color: g.color
                }
                arr.push(obj)
            }
        }
        i.products = arr
    }
    res.send(subCategoryJsonParse)

}

const GET1 = (req, res) => {
    let subCategory = fs.readFileSync(path.join(process.cwd(),'src','database','subcategorys.json'), 'UTF-8')
    let products = fs.readFileSync(path.join(process.cwd(),'src','database','products.json'), 'UTF-8')
    let subCategoryJsonParse = JSON.parse(subCategory)
    let productsJsonParse = JSON.parse(products)
    let search = req.query
    function filter(arr, search) {
        let storage = []
            for (let i in arr) {
                let counter = 0
                let length = 0
                for (let j in search) {
                    if (search[j] == arr[i][j]) {
                        counter++
                    }
                    length += 1
                }
                if (counter === length) {   
                    storage.push(arr[i]);
                }
            }
    
            return storage
    
    }

    let response = filter(productsJsonParse,search)
    	// let product = subCategoryJsonParse.filter( elem => elem.subCategoryId == subcategoryId )
        // for(let i of product) {
        //     let arr = []
        //     for(let g of productsJsonParse) {
        //         if(i.subCategoryId == g.subCategoryId) {
        //             let obj = {
        //                 productId: g.productId,
        //                 productName: g.productName,
        //                 model: g.model,
        //                 price: g.price,
        //                 color: g.color
        //             }
        //             arr.push(obj)
        //         }
        //     }
        //     i.products = arr
        // }
    	return res.json( response || { message: 'not found!' } )

    // res.send(subCategoryJsonParse)
}



export {
    GETCATEGORY,
    GETSUBCATEGORY,
    GET1
}