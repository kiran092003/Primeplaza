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
            Catogarie: { $in: ["Men", "Men's clothing"] },
          });
          res.json({ products: products, msg: "successfull" });
    } catch (error) {
        console.log(error);
    }
}

const getWomenFashionProducts = async (req,res)=>{
    try {
        const products = await FashionSchema.find({
            Catogarie: { $in: ["women", "Women's clothing"] },
          });
          res.json({ products: products, msg: "successfull" });
    } catch (error) {
        console.log(error);
    }
}

const getMenFilterProducts = async (req,res)=>{
    const {brandName,name,sort,Catogarie,subCatogaries,numericFilters,color,priceRange}=req.query;

    const queryObject = {};

    if(brandName){
        queryObject.brandName={ $regex: brandName, $options: 'i' };
    }
    if(name){
        queryObject.name={ $regex: name, $options: 'i' };
    }
    if(Catogarie){
        queryObject.Catogarie=Catogarie;
    }
    if(subCatogaries){
         queryObject.subCatogaries = { $in: subCatogaries.split(',').map(subCat => subCat.trim()) };
    }
    if(color){
        queryObject.color = { $in: color.split(',').map(subCat => subCat.trim()) };
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
         queryObject[field] = { [operator]: Number(value) };
            
     }
     if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split("-");
        if (minPrice && maxPrice) {
            queryObject.price = {
            $gte: parseFloat(minPrice),
            $lte: parseFloat(maxPrice),
          };
        } else if (minPrice) {
            queryObject.price = { $gte: parseFloat(minPrice) };
        } else if (maxPrice) {
            queryObject.price = { $lte: parseFloat(maxPrice) };
        }
      }

     let result = FashionSchema.find(queryObject);

     if (sort) {
        const sortList = sort.split(',').map(field => {
          if (field.startsWith('-')) {
            return { [field.substring(1)]: -1 }; // descending
          } else {
            return { [field]: 1 }; // ascending
          }
        });
        const sortObject = sortList.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        result = result.sort(sortObject);
      }
      
    try {
        const products = await result;
        res.status(200).json( {products} );
    } catch (error) {
        console.log(error);
    }
}



module.exports={addProducts,getMenFashionProducts,getWomenFashionProducts,getMenFilterProducts};