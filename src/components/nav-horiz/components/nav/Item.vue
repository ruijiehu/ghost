<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      default: ''
    }
  },
  render (h, context) {
    const { title, icon } = context.props
    const vnodes = []
    if (icon) {
      switch (icon) {
        case 1:
          vnodes.push(<img slot='icon' src={require('../../../../../assets/img/nav1.png')} alt=""/>)
          break
        case 2:
          vnodes.push(<img slot='icon' src={require('../../../../../assets/img/nav2.png')} alt=""/>)
          break
        case 3:
          vnodes.push(<img slot='icon' src={require('../../../../../assets/img/nav3.png')} alt=""/>)
          break
        case 4:
          vnodes.push(<img slot='icon' src={require('../../../../../assets/img/nav4.png')} alt=""/>)
          break
        case 5:
          vnodes.push(<img slot='icon' src={require('../../../../../assets/img/nav5.png')} alt=""/>)
          break
        default:
          break
      }
    }
    if (title) {
      vnodes.push(<span slot='title' style="margin-left:10px">{(title)}</span>)
    }
    return vnodes
  }
}
</script>
