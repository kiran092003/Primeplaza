const FashionSchema = require("../model/fashionproducts");

const addProducts = async(req,res)=>{
    try {
       const reqdata=req.body;
       const data=await FashionSchema.create(reqdata);
       res.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
}

const getMenFashionProducts = async (req,res)=>{
    try {
        const products = await FashionSchema.find({
            Catogarie:"Men",
          });
          res.json({ products: products, msg: "successfull" });
    } catch (error) {
        console.log(error);
    }
}

const getWomenFashionProducts = async (req,res)=>{
    try {
        const products = await FashionSchema.find({
            Catogarie: { $in: ["Women", "Women's clothing"] },
          });
          res.json({ products: products, msg: "successfull" });
    } catch (error) {
        console.log(error);
    }
}

const getKidsFashionProducts = async (req,res)=>{
    try {
        const products = await FashionSchema.find({
            Catogarie: { $in: ["Kids"] },
          });
          res.json({ products: products, msg: "successfull" });
    } catch (error) {
        console.log(error);
    }
}

const getMenFilterProducts = async (req, res) => {
    const { brandName, name, sort, Catogarie, subCatogaries, numericFilters, color, priceRange } = req.query;

    try {
        // Fetch Men products from the database
        const Menproducts = await FashionSchema.find({ Catogarie: "Men" });

        let filteredProducts = Menproducts;

        if (brandName) {
            const regex = new RegExp(brandName, 'i');
            filteredProducts = filteredProducts.filter(product => regex.test(product.brandName));
        }
        if (name) {
            const regex = new RegExp(name, 'i');
            filteredProducts = filteredProducts.filter(product => regex.test(product.name));
        }
        if (Catogarie) {
            filteredProducts = filteredProducts.filter(product => product.Catogarie === Catogarie);
        }
        if (subCatogaries) {
            const subCatArray = subCatogaries.split(',').map(subCat => subCat.trim());
            filteredProducts = filteredProducts.filter(product => subCatArray.includes(product.subCatogaries));
        }
        if (color) {
            const colorArray = color.split(',').map(col => col.trim());
            filteredProducts = filteredProducts.filter(product => colorArray.includes(product.color));
        }
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
            );
            const [field, operator, value] = filters.split('-');
            filteredProducts = filteredProducts.filter(product => {
                switch (operator) {
                    case '$gt': return product[field] > Number(value);
                    case '$gte': return product[field] >= Number(value);
                    case '$eq': return product[field] === Number(value);
                    case '$lt': return product[field] < Number(value);
                    case '$lte': return product[field] <= Number(value);
                    default: return true;
                }
            });
        }
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split("-");
            filteredProducts = filteredProducts.filter(product => {
                const price = product.price;
                if (minPrice && maxPrice) {
                    return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
                } else if (minPrice) {
                    return price >= parseFloat(minPrice);
                } else if (maxPrice) {
                    return price <= parseFloat(maxPrice);
                }
                return true;
            });
        }

        if (sort) {
            const sortList = sort.split(',').map(field => {
                if (field.startsWith('-')) {
                    return { [field.substring(1)]: -1 }; // descending
                } else {
                    return { [field]: 1 }; // ascending
                }
            });
            const sortObject = sortList.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            filteredProducts = filteredProducts.sort((a, b) => {
                for (let key in sortObject) {
                    if (a[key] < b[key]) return sortObject[key] * -1;
                    if (a[key] > b[key]) return sortObject[key];
                }
                return 0;
            });
        }

        res.status(200).json({ products: filteredProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

const getWomenFilterProducts = async (req, res) => {
    const { brandName, name, sort, Catogarie, subCatogaries, numericFilters, color, priceRange } = req.query;

    try {
        // Fetch Women products from the database
        const Womenproducts = await FashionSchema.find({ Catogarie: "Women" });

        let filteredProducts = Womenproducts;

        if (brandName) {
            const regex = new RegExp(brandName, 'i');
            filteredProducts = filteredProducts.filter(product => regex.test(product.brandName));
        }
        if (name) {
            const regex = new RegExp(name, 'i');
            filteredProducts = filteredProducts.filter(product => regex.test(product.name));
        }
        if (Catogarie) {
            filteredProducts = filteredProducts.filter(product => product.Catogarie === Catogarie);
        }
        if (subCatogaries) {
            const subCatArray = subCatogaries.split(',').map(subCat => subCat.trim());
            filteredProducts = filteredProducts.filter(product => subCatArray.includes(product.subCatogaries));
        }
        if (color) {
            const colorArray = color.split(',').map(col => col.trim());
            filteredProducts = filteredProducts.filter(product => colorArray.includes(product.color));
        }
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
            );
            const [field, operator, value] = filters.split('-');
            filteredProducts = filteredProducts.filter(product => {
                switch (operator) {
                    case '$gt': return product[field] > Number(value);
                    case '$gte': return product[field] >= Number(value);
                    case '$eq': return product[field] === Number(value);
                    case '$lt': return product[field] < Number(value);
                    case '$lte': return product[field] <= Number(value);
                    default: return true;
                }
            });
        }
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split("-");
            filteredProducts = filteredProducts.filter(product => {
                const price = product.price;
                if (minPrice && maxPrice) {
                    return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
                } else if (minPrice) {
                    return price >= parseFloat(minPrice);
                } else if (maxPrice) {
                    return price <= parseFloat(maxPrice);
                }
                return true;
            });
        }

        if (sort) {
            const sortList = sort.split(',').map(field => {
                if (field.startsWith('-')) {
                    return { [field.substring(1)]: -1 }; // descending
                } else {
                    return { [field]: 1 }; // ascending
                }
            });
            const sortObject = sortList.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            filteredProducts = filteredProducts.sort((a, b) => {
                for (let key in sortObject) {
                    if (a[key] < b[key]) return sortObject[key] * -1;
                    if (a[key] > b[key]) return sortObject[key];
                }
                return 0;
            });
        }

        res.status(200).json({ products: filteredProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

const getKidsFilterProducts = async (req, res) => {
    const { brandName, name, sort, Catogarie, subCatogaries, numericFilters, color, priceRange } = req.query;

    try {
        // Fetch Kids products from the database
        const Kidsproducts = await FashionSchema.find({ Catogarie: "Kids" });

        let filteredProducts = Kidsproducts;

        if (brandName) {
            const regex = new RegExp(brandName, 'i');
            filteredProducts = filteredProducts.filter(product => regex.test(product.brandName));
        }
        if (name) {
            const regex = new RegExp(name, 'i');
            filteredProducts = filteredProducts.filter(product => regex.test(product.name));
        }
        if (Catogarie) {
            filteredProducts = filteredProducts.filter(product => product.Catogarie === Catogarie);
        }
        if (subCatogaries) {
            const subCatArray = subCatogaries.split(',').map(subCat => subCat.trim());
            filteredProducts = filteredProducts.filter(product => subCatArray.includes(product.subCatogaries));
        }
        if (color) {
            const colorArray = color.split(',').map(col => col.trim());
            filteredProducts = filteredProducts.filter(product => colorArray.includes(product.color));
        }
        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
            );
            const [field, operator, value] = filters.split('-');
            filteredProducts = filteredProducts.filter(product => {
                switch (operator) {
                    case '$gt': return product[field] > Number(value);
                    case '$gte': return product[field] >= Number(value);
                    case '$eq': return product[field] === Number(value);
                    case '$lt': return product[field] < Number(value);
                    case '$lte': return product[field] <= Number(value);
                    default: return true;
                }
            });
        }
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split("-");
            filteredProducts = filteredProducts.filter(product => {
                const price = product.price;
                if (minPrice && maxPrice) {
                    return price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
                } else if (minPrice) {
                    return price >= parseFloat(minPrice);
                } else if (maxPrice) {
                    return price <= parseFloat(maxPrice);
                }
                return true;
            });
        }

        if (sort) {
            const sortList = sort.split(',').map(field => {
                if (field.startsWith('-')) {
                    return { [field.substring(1)]: -1 }; // descending
                } else {
                    return { [field]: 1 }; // ascending
                }
            });
            const sortObject = sortList.reduce((acc, curr) => ({ ...acc, ...curr }), {});
            filteredProducts = filteredProducts.sort((a, b) => {
                for (let key in sortObject) {
                    if (a[key] < b[key]) return sortObject[key] * -1;
                    if (a[key] > b[key]) return sortObject[key];
                }
                return 0;
            });
        }

        res.status(200).json({ products: filteredProducts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching products" });
    }
}

const getSingleProduct = async (req, res) => {
    const { Id } = req.query;
    if (!Id) {
      return res.status(400).json({
        msg: "ProductId is required",
      });
    }
    try {
      const product = await FashionSchema.find({ _id: Id });
      res.json({ product: product, msg: "product found successfully!!!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const getproductidbyName = async (req,res)=>{
    try {
        const { name } = req.body; 
        const product = await FashionSchema.find({ name: { $regex: name, $options: 'i' } }); 
        res.json({ product });
    } catch (error) {
        console.log(error);
    }
  }


module.exports={addProducts,getMenFashionProducts,getWomenFashionProducts,getMenFilterProducts,getWomenFilterProducts,getKidsFilterProducts,getKidsFashionProducts
                ,getSingleProduct ,getproductidbyName};