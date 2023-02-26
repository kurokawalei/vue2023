<script >
export default {
    props:['pagination','getProducts'],
    template:`      
    <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center pagination-lg">
      <li class="page-item" :class="{ disabled: pagination.has_next }">
        <a href="#" class="page-link" @click.prevent="getProducts(pagination.current_page-1)">上一頁</a>
      </li>


      <li class="page-item " v-for="(page , key) in  pagination.total_pages  "   :key="page+'page'" 
      :class="{ active: page === pagination.current_page } 

      ">
      <a class="page-link" href="#" @click.prevent="getProducts(page)" :class="{ disabled: page === pagination.current_page  }">{{page}}</a></li>
     
      <li class="page-item" :class="{ disabled: pagination.has_pre }">
        <a class="page-link" href="#" @click.prevent="getProducts( pagination.current_page + 1 )">下一頁</a>
      </li>
    </ul>
  </nav>
`
}
</script>