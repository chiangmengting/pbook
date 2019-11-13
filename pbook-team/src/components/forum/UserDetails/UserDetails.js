import React from 'react'
import './UserDetails.scss'
import { connect } from 'react-redux'
import {
  userHover,
  categoryHover,
  detailUpdate,
  details,
} from '../../../pages/Forum/fmAction'

//props : memberId={fm_memberId} read={true}//閱讀人數是否顯示 article={article} //文章資料

class UserDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      update: false,
      user: false,
    }
  }

  componentDidMount() {
    // 用props傳入的userID在fetch一次
    if (!this.props.update) {
      fetch('http://localhost:5555/forum/homepage/' + this.props.memberId)
        .then(response => {
          return response.json()
        })
        .then(async result => {
          // let update = true
          // let userData = result[0]
          // const data = { update, userData }
          // this.props.dispatch(userHover(data))

          await this.setState({ user: result[0], update: true })
        })
    }
  }
  handleCategoryClick = event => {
    console.log('category click')
  }

  handleUserClick = event => {
    console.log('User click')
  }
  //Category details hover frame
  handleCategoryMouseIn = event => {
    let hover = true
    this.props.dispatch(categoryHover(hover))
  }
  handleCategoryMouseOut = event => {
    let hover = false
    this.props.dispatch(categoryHover(hover))
  }
  //user details hover frame
  handleUserMouseIn = event => {
    let hover = true
    console.log(this.props)
    this.props.dispatch(userHover(hover))
  }
  handleUserMouseOut = event => {
    let hover = false
    console.log(this.props.userHover)
    this.props.dispatch(userHover(hover))
  }
  render() {
    if (!this.state.update) {
      return <span>Loading</span>
    } else {
      let article = this.props.article
      let user = this.state.user
      let userImage = user.MR_pic

      return (
        <>
          <div>{this.props.userHover}</div>
          <div className="card-details">
            <img
              className="card-details-img "
              src={'http://localhost:5555/images/member/' + userImage}
              alt=""
              onClick={this.handleUserClick}
            />
            <div className="card-writer-wrapper">
              <div>
                <a
                  href="#1"
                  className="card-user-link"
                  onClick={this.handleUserClick}
                  onMouseEnter={this.handleUserMouseIn}
                  onMouseLeave={this.handleUserMouseOut}
                >
                  {this.state.user && this.state.user.MR_nickname}
                  <div
                    className={
                      'userFrame ' +
                      (this.props.userHover ? 'displayBlock' : 'displayNone')
                    }
                  >
                    user details<br></br>user details<br></br>user details
                    <br></br>user details
                  </div>
                </a>
                <span>發表於</span>
                <a
                  href="#2"
                  className="card-category-link"
                  onClick={this.handleCategoryClick}
                  onMouseEnter={this.handleCategoryMouseIn}
                  onMouseLeave={this.handleCategoryMouseOut}
                >
                  {article.fm_category}
                  <div
                    className={
                      'userFrame ' +
                      (this.props.categoryHover
                        ? 'displayBlock'
                        : 'displayNone')
                    }
                  >
                    {' '}
                    user details<br></br>user details<br></br>user details
                    <br></br>user details
                  </div>
                </a>
              </div>
              <div>
                <time>{article.fm_publishTime.slice(0, 10)} </time>
                <span
                  className={
                    this.props.read ? 'displayInlineBlock' : 'displayNone'
                  }
                >
                  {article.fm_read}人閱讀
                </span>
                <span className="card-response">16則留言</span>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
}

// 綁定props.todos <=> store.todos
const mapStateToProps = store => ({
  userHover: store.UserDetails.userHover,
  categoryHover: store.UserDetails.cateHover,
  update: store.UserDetails.update,
  data: store.UserDetails.data,
})

// redux(state)綁定到此元件的props、dispatch方法自動綁定到此元件的props
export default connect(mapStateToProps)(UserDetails)
