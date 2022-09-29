export default interface IPolicy{
    "_id":string,
    "service_Id":string, // Car-Id is 
    "user":Object,
    "car":Object,
    "base_premium":Number,
    "auto_premium":Number,
    "load":Number,
    "discount":Number,
    "Policy_number":String,
    "signed_date":string,
    "expir_date":string,
    "total_payment":Number
}